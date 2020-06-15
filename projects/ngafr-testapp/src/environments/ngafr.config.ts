export const CommunicationConfig = {
    production: false,
    allowAudio: true,
    allowVideo: true,
    video: {
        frameRate: { min: 1.0, max: 60.0 },
        width: 320,
        height: 240
    },
    iceServersConfig: {
        iceServers: [
            { urls: 'stun:stun.services.mozilla.com' },
            { urls: 'stun:stun.l.google.com:19302' }
        ]
    },
    // bandwidth options : 'Unlimited', 2000, 1000, 500, 250, 125, 60
    bandwidthLimit: 60
};
