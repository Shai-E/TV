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
                url: "https://kancdn.medonecdn.net/livehls/oil/kancdn-live/live/kan11/live.livx/playlist.m3u8?renditions&amp;fmp4",
                // url: "https://kan11w.media.kan.org.il/hls/live/2105694/2105694/source1_4k/chunklist.m3u8",
                img: kanImage,
            },
            {
                name: "Keshet-12",
                channel: 12,
                url: 'https://mako-streaming.akamaized.net/stream/hls/live/2033791/k12dvr/profile/0/hdntl=exp=1770718980~acl=%2f*~data=hdntl~hmac=7e4927b739ba4bdcbd21516425877dc4fca4054095a7abc94e1268ba1948f626/profileManifest.m3u8?_uid=3b087ef9-f4ce-41e7-bec6-2b37c246966f&rK=b8&_did=Wd720f40fa73264f1c45804dc924082f89b4',
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
                url: "https://r.il.cdn-redge.media/livehls/oil/ch14/live/ch14/live.livx/playlist.m3u8",
                img: nowImage,
            },
            {
                name: "i24",
                channel: 15,
                url: 'https://fastly.live.brightcove.com/6386790215112/eu-central-1/5377161796001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiZXJmajYzLmVncmVzcy53YzQ3bTEiLCJhY2NvdW50X2lkIjoiNTM3NzE2MTc5NjAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI1Mzc3MTYxNzk2MDAxIl0sImp0aSI6IjYzODY3OTAyMTUxMTIifQ.8ZawImK7DfcrrXeAT2OVZ62qQJrJiBaoc7Y1DNNq1bg/chunklist__4.m3u8',
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
            // {
            //     name: "big-brother",
            //     channel: 26,
            //     img: bigbrother,
            //     url: "https://d3snfszc9pg25z.cloudfront.net/out/v1/11329fc2b33a4eca9a2d715c652aa167/playlist_2.m3u8?_uid=fb6c47fd-12f6-4389-9a87-28534c4bcb82&rK=a2&_did=a0f124d800d5d99677d40f7b232f6ebb68a64e92",
            // }
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