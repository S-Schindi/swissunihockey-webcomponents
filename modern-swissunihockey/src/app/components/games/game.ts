export interface Game {
    ArenaID: number;
    ArenaLatitude: number;
    ArenaLongitude: number;
    ArenaName: string;
    AwayTeamClubID: number;
    AwayTeamClubLogoURL: string;
    AwayTeamClubName: string;
    AwayTeamDisplayName: string;
    AwayTeamHideExtendedPlayerInformation: boolean;
    AwayTeamID: number;
    AwayTeamIsSportswikTeam: boolean;
    AwayTeamScore: string;
    AwayTeamScoreAndName: string;
    AwayTeamSetScore: string | null;
    AwayTeamTeamName: string;
    Cancelled: boolean;
    EventReportingForbidden: boolean;
    FairPlayCardEnabled: boolean;
    FederationOrCupName: string;
    FinalResultTypeID: number;
    Finalized: boolean;
    FinalizedByID: number | null;
    GameID: number;
    GameNumber: string;
    GameRound: number;
    GameStatusID: number;
    GameTime: string;
    HideResult: boolean;
    HomeTeamClubID: number;
    HomeTeamClubLogoURL: string;
    HomeTeamClubName: string;
    HomeTeamDisplayName: string;
    HomeTeamHideExtendedPlayerInformation: boolean;
    HomeTeamID: number;
    HomeTeamIsSportswikTeam: boolean;
    HomeTeamScore: string;
    HomeTeamScoreAndName: string;
    HomeTeamSetScore: string | null;
    HomeTeamTeamName: string;
    ImportedGame: boolean;
    Interrupted: boolean;
    IsChildGame: boolean;
    LeagueAgeCategoryID: number;
    LeagueCategoryID: number;
    LeagueDisplayName: string;
    LeagueID: number;
    LeagueName: string;
    LeagueOrganizerID: number;
    LiveStreamProviderID: number;
    MemberCanDelete: boolean;
    MemberCanEdit: boolean;
    MemberIsFollowingAwayTeam: boolean;
    MemberIsFollowingHomeTeam: boolean;
    NumberOfAttendees: number;
    NumberOfDiscussionPosts: number;
    NumberOfEventReports: number;
    NumberOfFairPlayCards: number;
    NumberOfGameReports: number;
    NumberOfGameRosters: number;
    NumberOfInterviews: number;
    NumberOfLineUps: number;
    NumberOfLiveStreamHighlights: number;
    NumberOfLiveStreams: number;
    NumberOfPeriods: number;
    NumberOfPics: number;
    NumberOfVideos: number;
    OccasionID: number;
    PeriodLengthInSeconds: number;
    PhotographyForbidden: boolean;
    Postponed: boolean;
    RefereeName: string;
    SocialEntityID: number;
    Spectators: number;
    SportID: number;
};
