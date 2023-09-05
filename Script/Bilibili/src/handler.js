import { DmViewReply } from "../lib/protos/dmView.js";
import { modifyBody } from "./utils.js";
import { ModeStatus } from "../lib/protos/modeStatus.js";
import { ViewReply } from "../lib/protos/view.js";
import { MainListReply } from "../lib/protos/mainReply.js";
import { SearchAll } from "../lib/protos/searchAll.js";
import { DynAllReply, DynamicType } from "../lib/protos/dynAll.js";
import { ViewProgress } from "../lib/protos/viewProgress.js";
import {
  ViewUniteReply,
  ModuleType,
  RelateCardType,
} from "../lib/protos/viewUnite.js";
export function handleDMView(grpcBody) {
  const dmMessage = DmViewReply.fromBinary(grpcBody);

  // remove interactive DM
  if (dmMessage.dmView?.commandDms?.length) {
    dmMessage.dmView.commandDms.length = 0;
    modifyBody(DmViewReply, dmMessage);
  }
}

export function handleModeStatus(grpcBody) {
  const modeMessage = ModeStatus.fromBinary(grpcBody);
  const teenagersMode = modeMessage.modes.find(
    (mode) => mode.name === "teenagers"
  );

  if (teenagersMode?.f5?.f1) {
    teenagersMode.f5.f1 = 0;
    modifyBody(ModeStatus, modeMessage);
  }
}

// export function handlePlayView(grpcBody) {
//   const replaceHost = getCDNHost();
//   if (!replaceHost) return;

//   const playMessage = PlayView.fromBinary(grpcBody);
//   const videos = playMessage.playURL.videos;
//   const audios = playMessage.playURL.audios;

//   replacePlayBaseURL(videos, replaceHost);
//   replacePlayBaseURL(audios, replaceHost);

//   modifyBody(PlayView, playMessage);
// }

export function handleV1View(grpcBody) {
  const viewMessage = ViewReply.fromBinary(grpcBody);
  // const replaceHost = getCDNHost();

  // remove  ad
  delete viewMessage.cmConfig;
  delete viewMessage.cmIpad;
  viewMessage.cms.length = 0;

  // if (replaceHost) {
  //   for (const relate of viewMessage.relates) {
  //     const url = new URLs(relate.uri);
  //     const preload = url.params.player_preload;
  //
  //     if (!preload) {
  //       continue;
  //     }
  //
  //     try {
  //       const preloadStr = decodeURIComponent(preload);
  //       const preloadObj = JSON.parse(preloadStr);
  //
  //       replaceViewBaseUrl(preloadObj.dash.video, replaceHost);
  //       replaceViewBaseUrl(preloadObj.dash.audio, replaceHost);
  //
  //       url.params.player_preload = encodeURIComponent(
  //         JSON.stringify(preloadObj)
  //       );
  //       relate.uri = url.toString();
  //
  //       console.log(`CDN replace -> ${replaceHost}`);
  //     } catch (e) {
  //       console.log(`[CDN ERROR] ${e}`);
  //       break;
  //     }
  //   }
  // }

  modifyBody(ViewReply, viewMessage);
}

export function handleReplyList(grpcBody) {
  const mainMessage = MainListReply.fromBinary(grpcBody);
  delete mainMessage.cm;
  modifyBody(MainListReply, mainMessage);
}

export function handleSearchAll(grpcBody) {
  const searchAllMessage = SearchAll.fromBinary(grpcBody);
  searchAllMessage.items = searchAllMessage.items.filter(
    (item) => !item.linktype.endsWith("_ad")
  );
  modifyBody(SearchAll, searchAllMessage);
}

export function handleDynAll(grpcBody) {
  const dynAllMessage = DynAllReply.fromBinary(grpcBody);
  delete dynAllMessage.topicList;
  dynAllMessage.dynamicList.list = dynAllMessage.dynamicList.list.filter(
    (item) => item.cardType !== DynamicType.ad
  );
  modifyBody(DynAllReply, dynAllMessage);
}

export function handleViewProgress(grpcBody) {
  const viewProgressMessage = ViewProgress.fromBinary(grpcBody);
  delete viewProgressMessage.dm;
  modifyBody(ViewProgress, viewProgressMessage);
}

export function handleViewUnite(grpcBody) {
  const viewUniteMessage = ViewUniteReply.fromBinary(grpcBody);
  delete viewUniteMessage.cm;

  viewUniteMessage.tab.tabModule.forEach(tabModule => {
    if (tabModule.tab.oneofKind !== "introduction") return;

    const relateModule = tabModule.tab.introduction.modules.find(
        module => module.type === ModuleType.RELATED_RECOMMEND
    );

    if (relateModule?.data?.oneofKind !== "relates" || !relateModule.data.relates.cards) return;

    relateModule.data.relates.cards = relateModule.data.relates.cards.filter(
        card => card.relateCardType === RelateCardType.AV
    );
});
  modifyBody(ViewUniteReply, viewUniteMessage);
}
