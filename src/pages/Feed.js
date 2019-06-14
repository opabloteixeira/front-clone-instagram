import React, { Component } from 'react'
import api, { url } from '../services/api'
import io from 'socket.io-client'

import './Feed.css'


import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'

class Feed extends Component {
    state = {
        feed: []
    }

    async componentDidMount(){
        this.registerToSocket()
        const response = await api.get('posts');
        
        this.setState({
            feed: response.data
        })
    }
    
    registerToSocket = () => {
        console.log(url)
        const socket = io(url)

        // post like

        socket.on('post', newPost => {
            this.setState({
                feed: [ newPost, ...this.state.feed]
            })
        })


        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map( item =>
                    item._id === likedPost._id ? likedPost : item
                )
            })
        })
    }


    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    render() {
        return ( 
            <section id="post-list">
                { this.state.feed.map(item => (
                    <article key={item._id}>
                        <header>
                            <div className="user-info">
                                <span>{item.author}</span>
                                <span className="place">{item.place}</span>
                            </div>
                            <img src={more} alt="mais"/>
                        </header>
                        <img src={`${url}/files/${item.image}`} alt="imagem"/>

                        <footer>
                            <div className="actions">
                                <span onClick={ () => this.handleLike(item._id) }>
                                    <img src={like} alt=""/>
                                </span>
                                <img src={comment} alt=""/>
                                <img src={send} alt=""/>
                            </div>
                            
                                <strong>{item.likes} curtidas</strong>

                                <p>
                                    {item.description}
                                    <span>{item.hashtags}</span>
                                </p>
                        </footer>
                    </article>
            )) }



            </section>
        )
    }
}

export default Feed