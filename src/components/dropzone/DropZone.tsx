import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {RainbowFont} from "../effects/Text";
import styled from 'styled-components';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #737373;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

/***
 *
 * @param onFileDrop
 * @constructor
 */
const DropZone = ({onFileDrop}) => {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                const text = reader.result;
                // @ts-ignore
                const value = JSON.parse(text);
                // @ts-ignore
                //TODO validate the file content
                onFileDrop(value);
            };
            reader.readAsText(file);
        })
    }, [onFileDrop]);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: 'application/json'
    });

    return (
        <div className="container">
            <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <RainbowFont>Drop the json here ...</RainbowFont> :
                        <RainbowFont>Drag 'n' drop .json here, or click to select</RainbowFont>
                }
            </Container>
        </div>

    )
}

export default DropZone;
