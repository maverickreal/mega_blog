import React from "react";
import { Container } from "../components";
import appwriteService from "../appwrite/config";

function EditPost() {
    const [post, setPost] = React.useState(null);
    const { slug } = React.useParams();
    const navigate = React.useNavigate();

    React.useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then(post => {
                    setPost(prevPost => (post || prevPost));
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    if (post) {
        return (
            <div className="py-8">
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        );
    } else {
        return null;
    }
}

export default EditPost;
