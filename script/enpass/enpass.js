var obj = JSON.parse($response.body);
obj.license = "pro";
$done({ body: JSON.stringify(obj) });
