import React, {Fragment} from "react"
import { Section } from "react-bulma-components"
import Comments from "./Comments"
import BlogPostTitle from "./BlogPostTitle"


const BlogPost = props => {
	const { blogPost, loggedInUser, singlePost} = props
    const { title, username, content, category, comments } = blogPost
    const showAddComment = username !== loggedInUser
    const showEditDelete = !showAddComment
	
	return (
        <Fragment>
            <Section className="content">
                    <BlogPostTitle title={title} showEditDelete={showEditDelete} / >
                    <p>{username}</p>
                    {category && <p>Category: {category}</p>}
                    <p>{content}</p>
            </Section>
            {/* Display comments if we are showing a single blog post */}
            {singlePost && (
                <Section className="content" >
                    <Comments comments={comments} showAddComment={showAddComment} />						
                </Section>
            )}
        </Fragment>
	)
}

export default BlogPost