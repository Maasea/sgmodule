import {DmViewReply} from "../lib/protos/dmView.js";
import {getCDNHost, modifyBody, replacePlayBaseURL, replaceViewBaseUrl} from "./utils.js";
import {ModeStatus} from "../lib/protos/modeStatus.js";
import {PlayView} from "../lib/protos/playerUrl.js";
import {ViewReply} from "../lib/protos/view.js";
import URLs from "../lib/urls.js";
import {MainListReply} from "../lib/protos/mainReply.js";

export function handleDMView(grpcBody) {
    const dmMessage = DmViewReply.fromBinary(grpcBody);

    // remove interactive DM
    if (dmMessage.dmView?.commandDms?.length) {
        dmMessage.dmView.commandDms.length = 0;
        modifyBody(DmViewReply, dmMessage)
    }
}

export function handleModeStatus(grpcBody) {
    const modeMessage = ModeStatus.fromBinary(grpcBody);
    const teenagersMode = modeMessage.modes.find((mode) => mode.name === "teenagers");

    if (teenagersMode?.f5?.f1) {
        teenagersMode.f5.f1 = 0;
        modifyBody(ModeStatus, modeMessage)
    }
}

export function handlePlayView(grpcBody) {
    const replaceHost = getCDNHost();
    if (!replaceHost) return;

    const playMessage = PlayView.fromBinary(grpcBody);
    const videos = playMessage.playURL.videos;
    const audios = playMessage.playURL.audios;

    replacePlayBaseURL(videos, replaceHost);
    replacePlayBaseURL(audios, replaceHost);

    modifyBody(PlayView, playMessage)
}

export function handleV1View(grpcBody) {
    const viewMessage = ViewReply.fromBinary(grpcBody);
    const replaceHost = getCDNHost();

    // remove  ad
    delete viewMessage.cmConfig;
    delete viewMessage.cmIpad;
    viewMessage.cms.length = 0;

    if (replaceHost) {
        for (const relate of viewMessage.relates) {
            const url = new URLs(relate.uri);
            const preload = url.params.player_preload;

            if (!preload) {
                continue;
            }

            try {
                const preloadStr = decodeURIComponent(preload);
                const preloadObj = JSON.parse(preloadStr);

                replaceViewBaseUrl(preloadObj.dash.video, replaceHost);
                replaceViewBaseUrl(preloadObj.dash.audio, replaceHost);

                url.params.player_preload = encodeURIComponent(JSON.stringify(preloadObj));
                relate.uri = url.toString();

                console.log(`CDN replace -> ${replaceHost}`);
            } catch (e) {
                console.log(`[CDN ERROR] ${e}`);
                break;
            }
        }
    }

    modifyBody(ViewReply, viewMessage)
}

export function handleReplyList(grpcBody) {
    const mainMessage = MainListReply.fromBinary(grpcBody);
    delete mainMessage.cm;
    modifyBody(MainListReply, mainMessage)
}
