export class Session {
  public sessionId: SessionId;
  public expire: Date;
  public userNickname: string;
}

export class SessionId {
  public userId: string;
  public token: string;
}
