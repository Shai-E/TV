import kanImage from '../../assets/images/kan.jpg';
import keshetImage from '../../assets/images/keshet.png';
import reshetImage from '../../assets/images/reshet.jpg';
import nowImage from '../../assets/images/now.jpg';
import i24Image from '../../assets/images/i24.png';
import knesetImage from '../../assets/images/kneset.jpg';
import tv10 from '../../assets/images/tv10.jpeg';

const channels = {
    israeli: {
        news: [
            {
                name: "tv10",
                channel: 10,
                url: 'https://r.il.cdn-redge.media/livehls/oil/calcala-live/live/channel10/live.livx/playlist.m3u8',
                // url: "https://n-121-2.il.cdn-redge.media/livedash/oil/calcala-live/live/channel10/live.livx?type=video&ft=1&id=4&bitrate=3000000&idx=384722665",
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
                // url: 'https://mako-streaming.akamaized.net/stream/hls/live/2033791/k12n12wad/profile/0/hdntl=exp=1728302277~acl=%2f*~data=hdntl~hmac=bbebf1d35582a84fa159680712d90c80cf87bee8f6a6e509a26057526202e7ac/profileManifest.m3u8?_uid=30b800c2-566f-451c-898e-8d45ea61d02c&rK=a1&_did=e9e61596f0245cac69926bf7084c4674d2a975ad',
                url: 'https://mako-streaming.akamaized.net/stream/hls/live/2033791/k12dvr/profile/2/hdntl=exp=1731864400~acl=%2f*~data=hdntl~hmac=c20e1ac9f573ded37c4db8de3afb8f6ce25fd105eabd241209aa9ba8d220ec09/profileManifest.m3u8?_uid=f0ea0c4b-0bfe-491a-a7d6-7cfd23125300&rK=a2&_did=Wd720f40fa73264f1c45804dc924082f89b4',
                img: keshetImage,
            },
            {
                name: "Reshet-13",
                channel: 13,
                // url: "https://media.reshet.tv/image/upload/v1746345448/13_q8gehw.webp","adTargetEnv":"prod","kalturaClientTag":"ReshetWeb","liveSources":{"mobile":{"live_with_subs":"https://reshet.g-mana.live/media/6f10d1da-0803-48d9-9272-57a811958974/mainManifest.m3u8","live_no_subs":"https://reshet.g-mana.live/media/cdefce3a-14ec-46cc-a147-1275c4a8b9ed/mainManifest.m3u8"},"desktop":{"live_with_subs":"https://reshet.g-mana.live/media/4607e158-e4d4-4e18-9160-3dc3ea9bc677/mainManifest.m3u8","live_no_subs":"https://reshet.g-mana.live/media/87f59c77-03f6-4bad-a648-897e095e7360/mainManifest.m3u8",
                url: "https://reshet.g-mana.live/media/6f10d1da-0803-48d9-9272-57a811958974/mainManifest.m3u8",
                // url: "https://reshet.g-mana.live/media/87f59c77-03f6-4bad-a648-897e095e7360/mainManifest.m3u8",
                // url: "https://reshet.g-mana.live/media/87f59c77-03f6-4bad-a648-897e095e7360/profile/2/profileManifest.m3u8?_uid=1c87b1f7-c8ed-479a-966e-f75b17247b3e&rK=a5&_did=9063e73c-ee5b-4ced-9781-3917324bec3b",
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
                // url: 'https://kneset.gostreaming.tv/p2-kneset/_definst_/myStream/playlist.m3u8',
                // url: 'https://contactgbs.mmdlive.lldns.net/contactgbs/a40693c59c714fecbcba2cee6e5ab957/chunklist_b564000.m3u8',
                img: knesetImage,
            },
        ],
        other: [

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