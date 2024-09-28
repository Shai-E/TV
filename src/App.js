import "./App.css";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import GridTV from "./components/GridTV";

function App() {
    const channels = {
        israeli: {
            news: [
                {
                    name: "Kan-11",
                    channel: 11,
                    url: "https://kan11w.media.kan.org.il/hls/live/2105694/2105694/source1_4k/chunklist.m3u8",
                    img: require('./assets/images/kan.jpg'),
                },
                {
                    name: "Keshet-12",
                    channel: 12,
                    url: "https://mako-streaming.akamaized.net/stream/hls/live/2033791/k12dvr/profile/0/hdntl=exp=1726926801~acl=%2f*~data=hdntl~hmac=99f779508cc7547d56cf41ee596705bfff3964fcbbf39a97c553eb62bf5c2d67/profileManifest.m3u8?_uid=6e55305f-72f1-40ec-8d45-32b40b8caec2&rK=a1&_did=Wd720f40fa73264f1c45804dc924082f89b4",
                    img: require('./assets/images/keshet.png'),
                },
                {
                    name: "Reshet-13",
                    channel: 13,
                    url: "https://reshet.g-mana.live/media/cdefce3a-14ec-46cc-a147-1275c4a8b9ed/profile/1/profileManifest.m3u8?_uid=b1915715-db1f-4c13-91cd-6e97f687e445&rK=a6&_did=f8603b08-db94-44ce-9a30-548209ef5609",
                    img: require('./assets/images/reshet.jpg'),
                },
                {
                    name: "Channel-14",
                    channel: 14,
                    url: "https://ch14-channel14-content.akamaized.net/hls/live/2104807/CH14_CHANNEL14/2/streamPlaylist.m3u8",
                    img: require('./assets/images/now.jpg'),
                },
                {
                    name: "i24",
                    channel: 15,
                    url: 'https://bcovlive-a.akamaihd.net/d89ede8094c741b7924120b27764153c/eu-central-1/5377161796001/profile_0/chunklist.m3u8',
                    img: require('./assets/images/i24.png'),
                }
            ],
            other: [
                // {
                //     name: "Hinuchit",
                //     channel: 23,
                //     url: 'https://kan23.media.kan.org.il/hls/live/2024691/2024691/source1_4k/chunklist.m3u8',
                //     img: require('./assets/images/hinuchit.jpg'),
                // }, 
            ]
        },
        international: {
            news: [
                {
                    name: "Fox News",
                    channel: 2,
                    url: 'https://dcs-live-ue1.mp.lura.live/server/play/5Awwm3GfagVzfpdA/rendition.m3u8?track=video-0&anvsid=m177618711-ndf4e88e6979aeb9ec550e1f6522dbf01&ts=1727554853&anvtrid=dfd918cf26a108eba51770a448f9f979',
                    img: require('./assets/images/Fox_News.png'),
                },
            ],
            other: [
  
            ]
        }
    };

    const allChannels = [
        ...channels.israeli.news,
        ...channels.israeli.other,
        ...channels.international.news,
        ...channels.international.other,
    ];

    return (
        <div className="App" style={{height: "100%", flex: 1}}>
            <Router>
                <Routes>
                    <Route
                        path="/:style"
                        element={
                            <GridTV channelsArray={allChannels} />
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
