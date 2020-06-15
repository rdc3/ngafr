
export interface IMessage {
    from: any;
    to: string;
    msg: any;
}
export interface IUserBase {
    id: string;
    name: string;
}
export interface IUserOnline extends IUserBase {
    connectionId: number;
    avatar: string;
    emailId: string;
    connectionState: string;
    lastUpdated: any;
}
export interface IOfferRequest {
    connectionId: number;
    user: IUserOnline;
}
type singleEventMethod = (event: any) => void;
export interface IConnection extends RTCPeerConnection {
    metaData: {
        offer: IOfferRequest;
        stream?: MediaStream;
        state?: string;
        peer?: IUserBase;
    };
    onaddstream: singleEventMethod; // method
}
export interface IIceServer {
    urls: string;
}
export interface IIceServers extends Array<IIceServer>{}
export interface ICommunicationConfig {
    production: boolean;
    allowAudio: boolean;
    allowVideo: boolean;
    video: {
        frameRate: { min: number },
        width: number;
        height: number;
    };
    iceServersConfig: {
        iceServers: IIceServers
    };
    bandwidthLimit: number;
}
