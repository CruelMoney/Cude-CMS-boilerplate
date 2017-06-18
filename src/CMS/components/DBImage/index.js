import React from 'react';
import editor from '../../higher-order-components/Editor/index';
import fetcher from '../../higher-order-components/Fetcher/index';
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import styles from './index.module.css'

 

class EditableImage extends React.Component {
    state = {accepted: [], rejected: []}


    static propTypes={
        registerEdits: PropTypes.func.isRequired
    }

    upload = () =>{
        if (!this.state.accepted){
            this.setState({err:"Please select an image."})
            return
        }
        if (!this.state.accepted.length > 1){
            this.setState({err:"Please select just one image."})
            return
        }

        var formData  = new FormData();
        const theFile = this.state.accepted[0]

        formData.append('file_upload', theFile, this.props.dbKey + "." + theFile.name.split('.').pop()); //This is the raw file that was selected
        
        const dbImage = this.props.data.find(img=>img.name === this.props.dbKey)
        const url = dbImage ? dbImage.url : null
        console.log(dbImage)
        const endPoint = dbImage ? `/api/fileupload/${dbImage._id}/update` : '/api/fileupload/create'

        fetch(process.env.PUBLIC_URL+endPoint, {
            method: dbImage ? "PUT" : 'POST',
            credentials: 'include',
            headers: new Headers({
            
            }),
            body: formData
        }).then(
            response => response.json() // if the response is a JSON object
        ).then(
            result => {
                if(result.error){
                    this.setState({error: "Something went wrong."})
                }else{
                    this.setState({error: null, url:result.url})
                }
                console.log(result)} 
        ).catch(
            error => this.setState({error: "Something went wrong."}) // Handle the error response object
        );
    }

    handleReject(file){
        if(file.size > 4000000){
            this.setState({error: "The file can't be larger than 4mb."})
            return
        }
        
        this.setState({error: "The file was rejected."})

    }
 
    render() {
        const dbImage = this.props.data.find(img=>img.name === this.props.dbKey)
        const url = dbImage ? dbImage.url : this.state.url
        return (
            this.props.editMode ?
                <div 
                    className={styles.wrapper + " editable"}
                >
                    <Dropzone
                        maxSize={4000000} //byte
                        multiple={false}
                        className={styles.dropZone}
                        accept="image/jpeg, image/png"
                        onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
                        onDropRejected={(file)=>this.handleReject(file)}
                        activeStyle={{backgroundColor: "rgba(76, 175, 80, 0.5)"}}
                        rejectStyle={{backgroundColor: "rgba(244, 67, 54, 0.5)"}}
                    >
                     
                    </Dropzone>

                    <div>
                        <p>Drop image here, or click to select image to upload.</p>
                        <p>Only *.jpeg and *.png images will be accepted.</p>
                        {this.state.accepted.length > 0 ?
                        <button
                        onClick={this.upload}
                        >
                        UPLOAD
                        </button>
                        : null}
                        {this.state.error ?
                        <p className="error">
                            {this.state.error}
                        </p>
                        : null}
                        
                    </div>

                    {url ? 
                    <img src={process.env.PUBLIC_URL + url} alt=""/>
                    : null}

                    
                        
                </div>
            :
            <img src={process.env.PUBLIC_URL + url} alt=""/> 
        
        );
    }
}



export default fetcher(EditableImage, '/api/fileupload/list')

export { EditableImage }


