export default function RemoveDuplicates(x) {
  for (var i = 0; i < x.length; i++) {
    for (var j = i + 1; j < x.length; j++) {
      if (x[i].post._id === x[j].post._id) x.splice(j, 1);
    }
  }
  return x;
}
