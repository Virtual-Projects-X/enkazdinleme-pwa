/* eslint-disable jsx-a11y/media-has-caption */

import { Button } from 'antd';
import dynamic from 'next/dynamic';

const ReactMediaRecorder = dynamic(
    () => import('react-media-recorder').then((mod) => mod.ReactMediaRecorder),
    {
        ssr: false,
    }
);

const RecordView = () => (
    // const { status, startRecording, stopRecording, mediaBlobUrl } =
    //     useReactMediaRecorder({ video: true, askPermissionOnMount: true });
    // console.log(status, 'xxx');

    <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
                <p>{status}</p>
                <Button onClick={startRecording}>Start Recording</Button>
                <Button onClick={stopRecording}>Stop Recording</Button>
                <video src={mediaBlobUrl} controls autoPlay loop />
            </div>
        )}
    />
    // <div>
    //     <p>{status}</p>
    //     <Button onClick={startRecording}>Start Recording</Button>
    //     <Button onClick={stopRecording}>Stop Recording</Button>
    //     <video src={mediaBlobUrl} controls autoPlay loop />
    // </div>
);
export default RecordView;
