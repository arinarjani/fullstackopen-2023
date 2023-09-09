const reverse = (string) => {
    return string.split('').reverse().join('');
}

const average = (array) => {
    return array.reduce((inital, accum) => inital + accum) / array.length
}

// 4.3 - dummy functio that recieves an array of blog posts as a parameter 
//       and always return the value 1

const dummy = (blogs) => {
    return 1;
}

// 4.4 - Define a new totalLikes function that receives a list of blog posts 
//       as a parameter. The function returns the total sum of likes in all of 
//       the blog posts.

const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentVal) => {
        return accumulator + currentVal.likes
    }, 0)
}

// 4.5 - Define a new favoriteBlog function that receives a list of blogs as 
//       a parameter. The function finds out which blog has the most likes. If 
//       there are many top favorites, it is enough to return one of them.

const favoriteBlog = (blogs) => {
    return blogs.reduce((accum, currentVal) => {
        return Math.max(accum, currentVal.likes)
    }, -Infinity)
}

// 4.6 - Define a function called mostBlogs that receives an array of blogs 
//       as a parameter. The function returns the author who has the largest 
//       amount of blogs. The return value also contains the number of blogs 
//       the top author has:

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return -1
    }

    let max = blogs[0].blogs
    let maxIndex = 0

    for (let index = 0; index < blogs.length; index++) {
        if (blogs[index].blogs > max) {
            max = blogs[index].blogs
            maxIndex = index
        }        
    }

    return blogs[maxIndex];
}

// 4.7 - Define a function called mostLikes that receives an array of blogs 
//       as its parameter. The function returns the author, whose blog posts 
//       have the largest amount of likes. The return value also contains the 
//       total number of likes that the author has received:

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return -1
    }

    let max = blogs[0].likes
    let maxIndex = 0

    for (let index = 0; index < blogs.length; index++) {
        if (blogs[index].likes > max) {
            max = blogs[index].likes
            maxIndex = index
        }        
    }

    return blogs[maxIndex];
}


module.exports = {
    reverse,
    average,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}