const arguments = JSON.parse($argument);

const HOST = arguments.HOST;
const TYPE = arguments.TYPE;
const UID = arguments.UID;
const ID = arguments.ID;
const SECRET = arguments.SECRET;
const TS = parseInt(Date.now() / 1000);
const DOMAIN = $domain;
const DID = arguments.DID;
const key = sha256(UID + SECRET + TS + DOMAIN + ID);

const URL_TEMPLATE = `https://${HOST}/resolve?name=${DOMAIN}&uid=${UID}&ak=${ID}&key=${key}&ts=${TS}&short=1&did=${DID}&type=${TYPE}`;

$httpClient.get(URL_TEMPLATE, function (error, response, data) {
  try {
    const addresses = JSON.parse(data);
    if (addresses?.length != 0) {
      $done({ addresses: JSON.parse(data), ttl: 600 });
    }
  } finally {
    $done({})
  }
});

// https://altv.stuyk.com/docs/articles/snippets/sha-256.html
function sha256(r){function o(r,o){return r>>>o|r<<32-o}for(var f,a=Math.pow,t=a(2,32),h="length",n="",c=[],e=8*r[h],i=sha256.h=sha256.h||[],s=sha256.k=sha256.k||[],u=s[h],v={},l=2;u<64;l++)if(!v[l]){for(d=0;d<313;d+=l)v[d]=l;i[u]=a(l,.5)*t|0,s[u++]=a(l,1/3)*t|0}for(r+="";r[h]%64-56;)r+="\0";for(d=0;d<r[h];d++){if((f=r.charCodeAt(d))>>8)return;c[d>>2]|=f<<(3-d)%4*8}for(c[c[h]]=e/t|0,c[c[h]]=e,f=0;f<c[h];){for(var g=c.slice(f,f+=16),k=i,i=i.slice(0,8),d=0;d<64;d++){var p=g[d-15],w=g[d-2],A=i[0],C=i[4];(i=[(w=i[7]+(o(C,6)^o(C,11)^o(C,25))+(C&i[5]^~C&i[6])+s[d]+(g[d]=d<16?g[d]:g[d-16]+(o(p,7)^o(p,18)^p>>>3)+g[d-7]+(o(w,17)^o(w,19)^w>>>10)|0))+((o(A,2)^o(A,13)^o(A,22))+(A&i[1]^A&i[2]^i[1]&i[2]))|0].concat(i))[4]=i[4]+w|0}for(d=0;d<8;d++)i[d]=i[d]+k[d]|0}for(d=0;d<8;d++)for(f=3;f+1;f--){var M=i[d]>>8*f&255;n+=(M<16?0:"")+M.toString(16)}return n}
