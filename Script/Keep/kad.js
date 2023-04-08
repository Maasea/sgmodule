let obj = JSON.parse($response.body);

delete obj.data.creative;
obj.data.hasAd = 0;

$done({ body: JSON.stringify(obj) });
