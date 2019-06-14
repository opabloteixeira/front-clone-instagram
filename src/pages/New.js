import React, { Component } from 'react'
import api from '../services/api'

import './New.css'

class New extends Component {


    state = {
        image: null,
        place: '',
        author: '',
        description: '',
        hashtags: '',
    }

    handleSubmit = async e => {
        e.preventDefault()

        const data = new FormData()

        data.append('image', this.state.image)
        data.append('author', this.state.author)
        data.append('place', this.state.place)
        data.append('description', this.state.description)
        data.append('hashtags', this.state.hashtags)

        await api.post('posts', data)


        this.props.history.push('/')

        // se fosse apenas envio de json (texto)
        /* await api.post('posts',{
            author,
        }) */
    }

    handleFormChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleImageChange = e => {
        this.setState({ image: e.target.files[0] })
    }




    render() {
        return ( 
        
            <form id="new-post" onSubmit={ this.handleSubmit }>
                <input type="file" onChange={ this.handleImageChange }/>

                <input 
                    type="text" 
                    name="author"
                    placeholder="Autor do post"
                    onChange={this.handleFormChange}
                    value={this.state.author}
                />

                <input 
                    type="text" 
                    name="place"
                    placeholder="Lugar do post"
                    onChange={this.handleFormChange}
                    value={this.state.place}
                />
                <input 
                    type="text" 
                    name="description"
                    placeholder="Descrição do post"
                    onChange={this.handleFormChange}
                    value={this.state.description}
                />

                <input 
                    type="text" 
                    name="hashtags"
                    placeholder="Hashtags do post"
                    onChange={this.handleFormChange}
                    value={this.state.hashtags}
                />

                <button type="submit">Enviar</button>

            </form> 
            
        )
    }
}

export default New