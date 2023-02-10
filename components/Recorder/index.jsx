/* eslint-disable react/button-has-type */
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
    <ReactMediaRecorder
        audio
        video={false}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
                <p>{status}</p>
                <Button onClick={startRecording}>Start Recording</Button>
                <Button onClick={stopRecording}>Stop Recording</Button>
                <audio src={mediaBlobUrl} controls />
            </div>
        )}
    />
);
export default RecordView;

// <ReactMediaRecorder
//     audio
//     video={false}
//     render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
//         <div>
//             <p>{status}</p>
//             <Button onClick={startRecording}>Start Recording</Button>
//             <Button onClick={stopRecording}>Stop Recording</Button>
//             <audio src={mediaBlobUrl} controls />
//         </div>
//     )}
// />
