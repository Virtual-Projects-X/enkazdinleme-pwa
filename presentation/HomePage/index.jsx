/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';

import {
    AudioOutlined,
    AudioMutedOutlined,
    BackwardOutlined,
} from '@ant-design/icons';
import { Typography, Button, Row, Col, Slider } from 'antd';
import dynamic from 'next/dynamic';

import StyledHomePage, { SlidersWrapper } from './styles';

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
    const [level, setLevel] = useState(1);
    const [minFrequency, setMinFrequency] = useState(300);
    const [maxFrequency, setMaxFrequency] = useState(3500);

    const resetInitial = () => {
        setLevel(1);
        setMinFrequency(300);
        setMaxFrequency(3500);
    };

    return (
        <SlidersWrapper className={className}>
            <Col span={24}>
                <Slider
                    onChange={(value) => setLevel(value)}
                    value={level}
                    defaultValue={level}
                    min={0}
                    max={100}
                />
                <Row align="middle" justify="center">
                    <Text>Kazanç (Seviye): {level}X</Text>
                </Row>
                <Slider
                    onChange={(value) => setMinFrequency(value)}
                    value={minFrequency}
                    defaultValue={minFrequency}
                    min={0}
                    max={1500}
                    className="mt-md"
                />
                <Row align="middle" justify="center">
                    <Text>Alt Frekans: {minFrequency} Hz</Text>
                </Row>
                <Slider
                    onChange={(value) => setMaxFrequency(value)}
                    value={maxFrequency}
                    defaultValue={maxFrequency}
                    min={2000}
                    max={22050}
                    className="mt-md"
                />
                <Row align="middle" justify="center">
                    <Text>Üst Frekans: {maxFrequency} Hz</Text>
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
                        <audio src={mediaBlobUrl} controls />
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
                                        {
                                            setCurrentStatus(
                                                initialStatus.STARTED
                                            );
                                            startRecording();
                                        }
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
                                        setCurrentStatus(
                                            initialStatus.FINISHED
                                        );
                                        stopRecording();
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
