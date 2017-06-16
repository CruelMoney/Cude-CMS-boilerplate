import React from 'react';
import editor from '../../higher-order-components/Editor/index';
import fetcher from '../../higher-order-components/Fetcher/index';
import PropTypes from 'prop-types'


class EditableImage extends React.Component {

    static propTypes={
        registerEdits: PropTypes.func.isRequired
    }


    render() {
        return (
                this.props.editMode ?
                <div 
                style={this.props.style}
                className={this.props.className + " editable"}
                
                /*onInput={(event)=>{
                    this.props.registerEdits(this.props.entityID,{[this.props.entityField]:event.target.innerHTML})}}
                dangerouslySetInnerHTML={{__html: content} }*/
                />
                : //if not editmode
                <div 
                    style={this.props.style}
                    className={this.props.className}
                />

        
        );
    }
}

class ConnectedImage extends React.Component {

    static contextTypes={
        staticContext: PropTypes.object
    }


    componentWillMount(){        
        // only serverside 
        if (this.context.staticContext && this.props.haveFetched){
            const found = this.props.data.some(t=>t.key===this.props.dbKey)
            
            // Create image if does not exist
            // if (!found){
            //     this.context.staticContext.promises.push(
            //         fetch(process.env.REACT_APP_BASEURL+'/api/texts', {
            //             method: 'POST',
            //             headers: new Headers({
            //             'Content-Type': 'application/json'
            //             }),
            //             body: JSON.stringify({key: this.props.dbKey, content: ""})
            //         })
            //     )
            // }
         }            
        }


    render() {
        

        // THIS COMPONENT SHOULD WORK WITH URLS
        // WHEN UPLOADING, THE IMAGE SHOULD BE SAVED AS FILE, 
        // AND IT'S URL SHOULD BE SAVED AT api/images endpoint
        // WHEN UPLOADING A NEW IMAGE IT SHOULD OVERRID THE LAST ONE
        // OR ALTERNATIVELY SAVE THE LAST ONE AS WELL, AND OFFER TO REVERT



        const dbImage = this.props.data.find(t=>t.key === this.props.dbKey) || {}
        const content = dbImage ? dbImage.content : null
        return (
                <EditableImage 
                    {...this.props}
                    key={dbImage._id}
                    registerEdits={this.props.registerEdits}
                    entityID={dbImage._id}
                    content={content}
                    entityField="content"
                />
        );
    }
}

export default fetcher(
    editor(ConnectedImage, "/api/images"), 
    "/api/images")

export { EditableImage }


