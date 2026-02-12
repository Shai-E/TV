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
                url: 'https://mako-streaming.akamaized.net/stream/hls/live/2033791/k12dvr/profile/2/hdntl=exp=1771004274~acl=%2f*~data=hdntl~hmac=96ef768e23c7fc0d9aee83b67af22a6c4307ca29d9eff62715be03d17037d803/profileManifest.m3u8?_uid=b7e41602-cf08-4c69-8005-b058c0d15271&rK=b2&_did=Wd720f40fa73264f1c45804dc924082f89b4',
                img: keshetImage,
            },
            {
                name: "Reshet-13",
                channel: 13,
                url: "https://d18b0e6mopany4.cloudfront.net/out/v1/1a7c55961dec4c72b51d79e5d9216cff/index.m3u8",
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
                url: "https://fastly.live.brightcove.com/6386790215112/eu-central-1/5377161796001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiZXJmajYzLmVncmVzcy53YzQ3bTEiLCJhY2NvdW50X2lkIjoiNTM3NzE2MTc5NjAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI1Mzc3MTYxNzk2MDAxIl0sImp0aSI6IjYzODY3OTAyMTUxMTIifQ.8ZawImK7DfcrrXeAT2OVZ62qQJrJiBaoc7Y1DNNq1bg/playlist-hls.m3u8?__nn__=5476555825001&hdnea=st=1770633000~exp=1770636600~acl=/6386790215112/eu-central-1/5377161796001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoiZXJmajYzLmVncmVzcy53YzQ3bTEiLCJhY2NvdW50X2lkIjoiNTM3NzE2MTc5NjAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI1Mzc3MTYxNzk2MDAxIl0sImp0aSI6IjYzODY3OTAyMTUxMTIifQ.8ZawImK7DfcrrXeAT2OVZ62qQJrJiBaoc7Y1DNNq1bg/*~hmac=ea9e2694d1d6e8932894dcccf7e02ec0a3f90298b91181ae688307036e66188b",
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