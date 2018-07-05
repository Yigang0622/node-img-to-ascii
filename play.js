let original = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^ ";

console.log(original.length);

let seq = '';
for(var i=original.length;i>=0;i--) {
    seq += '\''+original.charAt(i)+"\',";
}

console.log(seq)
