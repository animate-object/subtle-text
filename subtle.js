main = (manipulator) => {
    let elements = document.body.getElementsByTagName('*');
    for (const element of elements) {
        try {
            if (["SCRIPT", "STYLE"].includes(element.tagName)) { continue }
            for (const child of element.childNodes) {
                if (child.nodeType === 3 && child.nodeValue !== null && child.nodeValue !== undefined) {
                    manipulated = manipulator(child.nodeValue);
                    if (manipulated !== null) {
                        element.replaceChild(document.createTextNode(manipulated), child);
                    }
                }
            }
        } catch (ex) {
            console.log(ex);
            console.log("failed to parse");
            console.log(element);
        }
    }
}

random_in_range = (range) => { return Math.floor(Math.random() * range); } 

n_random_in_range = (n, range) => {
    const n_random = [];
    for (i = 0; i < n; i++) {
        n_random.push(random_in_range(range));
    }
    return n_random;
}


weight_bounded_random = (n, weight) => {
    // generates a random number between 0 and ceil(n/weight)  s.t.
    // n = 1, weight = 100 has a 1 % chance to return 1, 
    // n = 101, weight = 100 has a 100% chance to return at least 1 and a 1% chance to return 2
    sum_randoms = 0;
    bound = n/weight
    num_randoms = Math.ceil(n/weight);
    count = 0;
    for (i = 0; i < num_randoms; i++) { 
        sum_randoms = sum_randoms + Math.random();
        if (sum_randoms < bound) { count = count + 1; }
    }
    return Math.floor(count);
}

const end_punctuation = ['.',',','?','!',')',']', '}']
const start_punctuation = ['(', '[', '[']

random_word_additions = (text) => {
    console.log("running random word additions");
    const words = text.split(" ");
    const addition_count = weight_bounded_random(words.length, 100);
    const addition_indices = n_random_in_range(addition_count, words.length);
    if (addition_indices.length === 0) {
        return null;
    } else {
    //    console.log(addition_indices);
    //    console.log(text);
    }
    copy = [];
    for (i = 0; i < words.length; i++) {
        const word = words[i];
        if (addition_indices.includes(i)) {
            let to_push = "";
            let repeat = "";
            console.log(text);
            console.log(i);
            console.log("doubling " + word);
            const first_p = start_punctuation.includes(word[0]);
            const last_p = end_punctuation.includes(word[word.length - 1]);
            if (first_p || last_p) { console.log("doing punctuatoin stuff"); }
            if (first_p && last_p) { 
                repeat = word.slice(1, word.length -1);
                to_push = word[0] + repeat + " " + repeat + word[word.length -1];
            } else if (first_p) {
                repeat = word.slice(1);
                to_push = word[0] + repeat + " " + repeat;
            } else if (last_p) {
                repeat = word.slice(0, word.length -1);
                to_push = repeat + " " + repeat + word[word.length -1];
            } else { to_push = word + " " + word; }
            copy.push(to_push);
        } else {
            copy.push(words[i]);
        }
    }

    return copy.join(" ");
}

random_letter_additions = (text) => {
    const addition_count = random_in_range(Math.floor(text.length / 20));
    let addition_indices = [];
    for (i = 0; i < addition_count; i++) {
        addition_indices.push(random_in_range(text.length));
    }
    if (addition_indices.length === 0) { return null; }

    let copy = "";
    for (i = 0; i < text.length; i ++) {
        copy = copy + text[i];
        if (addition_indices.includes(i)){
            copy = copy + text[i];
        }
    }
    return copy;
}

main(random_word_additions);

