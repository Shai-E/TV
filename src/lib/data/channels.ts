import kanImage from '../../assets/images/kan.jpg';
import keshetImage from '../../assets/images/keshet.png';
import reshetImage from '../../assets/images/reshet.jpg';
import nowImage from '../../assets/images/now.jpg';
import i24Image from '../../assets/images/i24.png';
import knesetImage from '../../assets/images/kneset.jpg';
import tv10 from '../../assets/images/tv10.jpeg';
import bigbrother from '../../assets/images/bigbrother.jpg';

const channels = {
    israeli: {
        news: [
            {
                name: "tv10",
                channel: 10,
                url: 'https://r.il.cdn-redge.media/livehls/oil/calcala-live/live/channel10/live.livx/playlist.m3u8',
                // srcType: "application/dash+xml",
                img: tv10,
            },
            {
                name: "Kan-11",
                channel: 11,
                url: "https://kan11w.media.kan.org.il/hls/live/2105694/2105694/source1_4k/chunklist.m3u8",
                img: kanImage,
            },
            {
                name: "Keshet-12",
                channel: 12,
                url: 'https://mako-streaming.akamaized.net/stream/hls/live/2033791/k12dvr/profile/2/hdntl=exp=1731864400~acl=%2f*~data=hdntl~hmac=c20e1ac9f573ded37c4db8de3afb8f6ce25fd105eabd241209aa9ba8d220ec09/profileManifest.m3u8?_uid=f0ea0c4b-0bfe-491a-a7d6-7cfd23125300&rK=a2&_did=Wd720f40fa73264f1c45804dc924082f89b4',
                img: keshetImage,
            },
            {
                name: "Reshet-13",
                channel: 13,
                url: "https://reshet.g-mana.live/media/6f10d1da-0803-48d9-9272-57a811958974/mainManifest.m3u8",
                img: reshetImage,
            },
            {
                name: "Channel-14",
                channel: 14,
                url: "https://ch14-channel14-content.akamaized.net/hls/live/2104807/CH14_CHANNEL14/2/streamPlaylist.m3u8",
                img: nowImage,
            },
            {
                name: "i24",
                channel: 15,
                url: 'https://bcovlive-a.akamaihd.net/d89ede8094c741b7924120b27764153c/eu-central-1/5377161796001/profile_0/chunklist.m3u8',
                img: i24Image,
            },
            {
                name: "Kneset",
                channel: 99,
                url: 'https://kneset.gostreaming.tv/p2-Accessibility/_definst_/myStream/chunklist.m3u8',
                img: knesetImage,
            },
        ],
        other: [
            {
                name: "big-brother",
                channel: 26,
                img: bigbrother,
                url: "https://d3snfszc9pg25z.cloudfront.net/out/v1/11329fc2b33a4eca9a2d715c652aa167/playlist_2.m3u8?_uid=fb6c47fd-12f6-4389-9a87-28534c4bcb82&rK=a2&_did=a0f124d800d5d99677d40f7b232f6ebb68a64e92",
            }
        ]
    },
    international: {
        news: [

        ],
        other: [

        ]
    }
};

export const allChannels = [
    ...channels.israeli.news,
    ...channels.israeli.other,
    ...channels.international.news,
    ...channels.international.other,
];