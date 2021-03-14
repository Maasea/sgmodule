var obj = JSON.parse($response.body);
obj.license = "pro";
obj.info.purchase_type = "pro";
$done({ body: JSON.stringify(obj) });
