const config = require('config');
const qqMusic = require('qq-music-api');
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken(config.get('spotify.token'))
qqMusic.setCookie(config.get('qqMusic.cookie'))

const main = async () =>  {
    const songMap = await getQqsongs(config.get('qqMusic.qqId'));
    var songIds = []
    try {
        for (const [songlistName, songlist] of songMap) {
            const songIdsPromises = songlist.map(async (song) => {
                return await searchSong(song.songname);
            });
            songIds = (await Promise.all(songIdsPromises)).filter(id => id!=null).map(id=>"spotify:track:"+id)
            const playlistId = await createOrGetSpotifyPlaylist(songlistName, "moved from QQ Music");
            const chunkSize = 20;
            for (let i = 0; i < songIds.length; i += chunkSize) {
                const chunk = songIds.slice(i, i + chunkSize);
                await spotifyApi.addTracksToPlaylist(playlistId, chunk);
            }
            console.log(songIds);
        }
    } catch (error) {
        console.error('处理歌单时发生错误:', error);
    }
}

main();

async function createOrGetSpotifyPlaylist(name, description) {
    try {
        const spotifyId = (await spotifyApi.getMe()).body.id
        // console.log(spotifyId);
        const playlists = (await spotifyApi.getUserPlaylists(spotifyId)).body.items;
        // console.log(playlistsName);
        for (var id in playlists) {            
            if (playlists[id].name == name) {
                console.log("playlist", name, "has been existed in your playlists")
                return playlists[id].id
            }
        }
        const playlist = await spotifyApi.createPlaylist(name, { 'description': description, 'public': false })
        return playlist.body.id;
    } catch (error) {
        console.error('发生错误:', error);
        throw err;
    }
}

async function searchSong(name) {
    // Search tracks whose name, album or artist contains 'Love'
    try {        
        const song = (await spotifyApi.searchTracks('track:' + name, { limit: 1 })).body.tracks.items;
        if (!song || song.length < 1) {
            console.log("Unable to find the song:", name);
            return null;
        }
        // console.log(song[0].id)
        return song[0].id
    } catch (error) {
        console.error('发生错误:', error);
        throw err;
    }
}

async function getQqsongs(qqId) {
    try {
        const songlists = await listSonglists(qqId);
        // console.log(songlists);
        const songPromises = songlists.map(async (songlist) => {
            const songs = await listSongs(songlist.id);
            return [songlist.name, songs];
        });
        const songMap = new Map(await Promise.all(songPromises));
        // const song = Object.fromEntries(songMap);
        // console.log(songMap);
        return songMap;
    } catch (error) {
        console.error('发生错误:', error);
        throw err;
    }
}

async function listSonglists(qqId) {
    try {
        const songlistSet = new Set();
        const like = await qqMusic.api('/user/detail', { id: qqId });
        // console.log(like)
        like.mymusic.forEach(element => {
            if (element.id != 0) {
                songlistSet.add({
                    id: element.id,
                    name: element.title
                });
            }
        });
        const collect = await qqMusic.api('/user/collect/songlist', { id: qqId });
        // console.log(collect)
        collect.list.forEach(element => {
            if (element.dissid != 0) {
                songlistSet.add({
                    id: element.dissid,
                    name: element.dissname
                });
            }
        });
        const songlists = Array.from(songlistSet);
        return songlists;
    } catch (err) {
        console.log('接口调用出错', err);
        throw err;
    }
}

async function listSongs(sonelistId) {
    try {
        const res = await qqMusic.api('/songlist', { id: sonelistId });
        const songSet = new Set();
        res.songlist.forEach(element => {
            songSet.add({
                songname: element.songname,
                singer: element.singer.map(element => element.name)
            });
        });
        const songlists = Array.from(songSet);
        return songlists;
    } catch (err) {
        console.log('接口调用出错', err);
        throw err;
    }
}