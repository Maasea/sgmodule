let obj = JSON.parse($response.body);
obj.data.floatingInfo = {}
$done({ body: JSON.stringify(obj) });