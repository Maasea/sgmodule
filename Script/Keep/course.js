let obj = JSON.parse($response.body);
const courseList = obj.data.courseList;

for (const course of courseList) {
  delete course.upgradeCourse;
}

$done({ body: JSON.stringify(obj) });
