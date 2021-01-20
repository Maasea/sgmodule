let obj = JSON.parse($response.body);
obj.data.banners = [];

$done({ body: JSON.stringify(obj) });