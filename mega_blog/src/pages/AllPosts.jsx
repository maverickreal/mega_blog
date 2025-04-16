import React from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = React.useState([]);

    appwriteService.getPosts()
        .then(posts => {
            setPosts(prevPosts => {
                return (posts?.documents || prevPosts);
            })
        });

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map(post => (
                        <div key={post.id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    )
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
