const {
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
} = require('../utils/for_testing')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

const favBlogs = [
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 134
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 134
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 11
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 0
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 1
    }
]

const most = [
    {author: 'aaa', blogs: 0},
    {author: 'aba', blogs: 3},
    {author: 'aab', blogs: 2},
    {author: 'baa', blogs: 4},
    {author: 'abb', blogs: 0}
]

const likes = [
    {author: 'aaa', likes: 0},
    {author: 'aba', likes: 3},
    {author: 'aab', likes: 2},
    {author: 'baa', likes: 4},
    {author: 'abb', likes: 0}
]

describe.skip('exercises 4.3 - 4.7', () => {
    test('4.3 - dummy to be one', () => {
        expect(dummy([1,2,3])).toBe(1)
    })

    test('4.4 - return total likes in a list of blogs', () => {
        expect(totalLikes(blogs)).toBe(36)
    })
})

describe.skip('favBlogs contain', () => {
    test('4.5 - the most likes of 134', () => {
        expect(favoriteBlog(favBlogs)).toBe(134)
    })
})

describe.skip('mostBlogs contains properties such as', () => {
    test('author with the most blogs', () => {
        expect(mostBlogs(most)).toEqual({author: 'baa', blogs: 4})
    })
})

describe.skip('mostLikes contains properties such as', () => {
    test('author with the most likes', () => {
        expect(mostLikes(likes)).toEqual({author: 'baa', likes: 4})
    })
})