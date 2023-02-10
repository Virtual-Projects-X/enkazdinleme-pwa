/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState, useRef } from 'react';

import {
    AudioOutlined,
    AudioMutedOutlined,
    BackwardOutlined,
} from '@ant-design/icons';
import { Typography, Button, Row, Col, Slider } from 'antd';
import dynamic from 'next/dynamic';

import StyledHomePage, { SlidersWrapper } from './styles';
import { useGainStore } from '../../store/useGainStore';
import { useHighFrequencyStore } from '../../store/useHighFrequencyStore';
import { useLowFrequencyStore } from '../../store/useLowFrequencyStore';

const ReactMediaRecorder = dynamic(
    () => import('react-media-recorder').then((mod) => mod.ReactMediaRecorder),
    {
        ssr: false,
    }
);

const { Title, Text } = Typography;

const bullets = [
    {
        id: 1,
        bulletInfo: 'Bu uygulama internet bağlantısı olmadan çalışabilir',
    },
    {
        id: 2,
        bulletInfo: 'Yapılan kayıtlar cihaz dışına yollanmaz',
    },
    {
        id: 3,
        bulletInfo: 'Kazanç ayarıyla sesi yükseltebilirsiniz',
    },
    {
        id: 4,
        bulletInfo:
            'Alt ve üst frekans ayarları ile insan sesinin dışındaki sesleri filitreliyebilirsiniz. Başlangıçta ideal bir noktaya ayarlıdır',
    },
    {
        id: 5,
        bulletInfo:
            'Mikrofon erişimine izin verdikten sonra cihazınızı sabit bir yere koyup kayıt tuşuna basın. Mümkün olduğunca sessiz kalın',
    },
    {
        id: 6,
        bulletInfo:
            'Dur tuşuna bastıktan sonra yaptığınız kayıt aşağıda gözükecektir',
    },
    {
        id: 7,
        bulletInfo:
            "iOS cihazlardaki sıkıntı giderildi, Emre Doğan'a teşekkürler",
    },
];

const SliderSection = ({ className, mediaBlobUrl }) => {
    const gainValue = useGainStore((state) => state.gainValue);
    const setGainValue = useGainStore((state) => state.setGainValue);

    const highFrequencyValue = useHighFrequencyStore(
        (state) => state.highFrequencyValue
    );
    const setHighFrequencyValue = useHighFrequencyStore(
        (state) => state.setHighFrequencyValue
    );

    const lowFrequencyValue = useLowFrequencyStore(
        (state) => state.lowFrequencyValue
    );
    const setLowFrequencyValue = useLowFrequencyStore(
        (state) => state.setLowFrequencyValue
    );

    const [contentType, setContentType] = useState();
    const audioRef = useRef(null);
    const gainRef = useRef(null);
    const filterLowRef = useRef(null);
    const filterHighRef = useRef(null);
    const audioTrackRef = useRef(null);
    const visualizerRef = useRef(null);

    const resetInitial = () => {
        setGainValue(1);
        setLowFrequencyValue(300);
        setHighFrequencyValue(3500);
    };

    useEffect(() => {
        if (mediaBlobUrl && audioRef.current) {
            if (!audioTrackRef.current) {
                const audioCtx = new AudioContext();

                audioTrackRef.current = audioCtx.createMediaElementSource(
                    audioRef.current
                );
                const gainNode = audioCtx.createGain();
                gainNode.gain.value = gainValue;

                const filterLow = audioCtx.createBiquadFilter();
                filterLow.type = 'highpass';
                filterLow.frequency.value = lowFrequencyValue;

                const filterHigh = audioCtx.createBiquadFilter();
                filterHigh.type = 'lowpass';
                filterHigh.frequency.value = highFrequencyValue;

                gainRef.current = gainNode;
                filterLowRef.current = filterLow;
                filterHighRef.current = filterHigh;

                fetch(mediaBlobUrl).then((response) => {
                    setContentType(JSON.stringify([...response.headers]));
                });

                visualizerRef.current = new Audio(mediaBlobUrl);

                audioTrackRef.current
                    .connect(filterLow)
                    .connect(filterHigh)
                    .connect(gainNode)
                    .connect(audioCtx.destination);
            }
        }
    }, [mediaBlobUrl]);

    useEffect(() => {
        if (filterHighRef.current && filterLowRef.current && gainRef.current) {
            gainRef.current.gain.value = gainValue;
            filterLowRef.current.frequency.value = lowFrequencyValue;
            filterHighRef.current.frequency.value = highFrequencyValue;
        }
    }, [
        filterHighRef,
        filterLowRef,
        gainRef,
        gainValue,
        highFrequencyValue,
        lowFrequencyValue,
    ]);

    return (
        <SlidersWrapper className={className}>
            <Col span={24}>
                <Slider
                    onChange={(value) => setGainValue(value)}
                    value={gainValue}
                    defaultValue={gainValue}
                    min={0}
                    max={100}
                />
                <Row align="middle" justify="center">
                    <Text>Kazanç (Seviye): {gainValue}X</Text>
                </Row>
                <Slider
                    onChange={(value) => setLowFrequencyValue(value)}
                    value={lowFrequencyValue}
                    defaultValue={lowFrequencyValue}
                    min={0}
                    max={1500}
                    className="mt-md"
                />
                <Row align="middle" justify="center">
                    <Text>Alt Frekans: {lowFrequencyValue} Hz</Text>
                </Row>
                <Slider
                    onChange={(value) => setHighFrequencyValue(value)}
                    value={highFrequencyValue}
                    defaultValue={highFrequencyValue}
                    min={2000}
                    max={22050}
                    className="mt-md"
                />
                <Row align="middle" justify="center">
                    <Text>Üst Frekans: {highFrequencyValue} Hz</Text>
                </Row>
                <Row align="middle" justify="center" className="mt-md">
                    <Button
                        icon={<BackwardOutlined />}
                        onClick={() => resetInitial()}
                        type="primary"
                        ghost
                        className="btn">
                        İnsan Sesi Filtreleme Ayarlarına Dön
                    </Button>
                </Row>
                {mediaBlobUrl && (
                    <Row className="mt-md" align="middle" justify="center">
                        <audio ref={audioRef} src={mediaBlobUrl} controls />
                        <Text>{contentType}</Text>
                        <Text>{mediaBlobUrl}</Text>
                    </Row>
                )}
            </Col>
        </SlidersWrapper>
    );
};

const HomePage = () => {
    const [currentStatus, setCurrentStatus] = useState(1);

    const initialStatus = {
        INITIAL: 1,
        STARTED: 2,
        FINISHED: 3,
    };

    return (
        <StyledHomePage span={24}>
            <Row align="middle" justify="center">
                <Title level={2}>Enkaz Dinleme Uygulaması</Title>
            </Row>
            <ReactMediaRecorder
                audio
                video={false}
                blobPropertyBag={{
                    type: 'audio/mp3',
                }}
                render={({
                    status,
                    startRecording,
                    stopRecording,
                    mediaBlobUrl,
                }) => (
                    <Row align="middle" justify="center" className="mt-md">
                        <Col xs={20} sm={20} md={20} lg={16} xl={16} xxl={16}>
                            {currentStatus === 1 ? (
                                <Button
                                    icon={<AudioOutlined />}
                                    onClick={() => {
                                        startRecording();
                                        setCurrentStatus(initialStatus.STARTED);
                                    }}
                                    type="primary"
                                    className="btn w-100-f">
                                    Kayıt
                                </Button>
                            ) : currentStatus === 2 ? (
                                <Button
                                    icon={<AudioMutedOutlined />}
                                    danger
                                    onClick={() => {
                                        stopRecording();
                                        setCurrentStatus(
                                            initialStatus.FINISHED
                                        );
                                    }}
                                    type="primary"
                                    className="btn w-100-f">
                                    Dur {status}
                                </Button>
                            ) : (
                                currentStatus === 3 && (
                                    <Button
                                        icon={<AudioMutedOutlined />}
                                        onClick={() => {
                                            startRecording();
                                            setCurrentStatus(
                                                initialStatus.STARTED
                                            );
                                        }}
                                        type="primary"
                                        className="btn w-100-f">
                                        Yeni Kayıt
                                    </Button>
                                )
                            )}
                            {currentStatus === 3 && (
                                <SliderSection
                                    mediaBlobUrl={mediaBlobUrl}
                                    className="mt-md"
                                />
                            )}
                        </Col>
                    </Row>
                )}
            />
            <div
                className="bullets-wrapper mt-md"
                align="middle"
                justify="center">
                {bullets.map((b) => (
                    <Text
                        style={{
                            fontSize: '12px',
                            display: 'block',
                            textAlign: 'center',
                        }}
                        key={`${b.id}-bullet-info`}>
                        -{b.bulletInfo}.
                    </Text>
                ))}
            </div>
        </StyledHomePage>
    );
};

export default HomePage;
