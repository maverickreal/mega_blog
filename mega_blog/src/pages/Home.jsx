import React from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import authService from "../appwrite/auth";

function Home() {
    const [posts, setPosts] = React.useState([]);
    const [noBlogsMessage, setNoBlogsMessage] = React.useState("Loading ...");

    React.useEffect(() => {
        authService.account.get()
            .then(() => {
                appwriteService.getPosts()
                    .then(posts => {
                        setNoBlogsMessage(() => (
                            posts.total ? "" : "No posts available."
                        ));
                        setPosts(prevPosts => (
                            posts.documents || prevPosts
                        ));
                    })
                    .catch(() => (
                        setNoBlogsMessage("No posts available.")
                    ));
            })
            .catch(() => setNoBlogsMessage("Login to view blogs."));
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {noBlogsMessage}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    } else {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map(post => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
}

export default Home;
