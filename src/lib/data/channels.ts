import kanImage from '../../assets/images/kan.jpg';
import keshetImage from '../../assets/images/keshet.png';
import reshetImage from '../../assets/images/reshet.jpg';
import nowImage from '../../assets/images/now.jpg';
import i24Image from '../../assets/images/i24.png';
import knesetImage from '../../assets/images/kneset.jpg';

const channels = {
    israeli: {
        news: [
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
                url: "https://reshet.g-mana.live/media/cdefce3a-14ec-46cc-a147-1275c4a8b9ed/profile/1/profileManifest.m3u8?_uid=b1915715-db1f-4c13-91cd-6e97f687e445&rK=a6&_did=f8603b08-db94-44ce-9a30-548209ef5609",
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
                url: 'https://contactgbs.mmdlive.lldns.net/contactgbs/a40693c59c714fecbcba2cee6e5ab957/chunklist_b564000.m3u8',
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