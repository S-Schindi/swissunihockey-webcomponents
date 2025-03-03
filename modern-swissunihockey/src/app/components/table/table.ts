interface TableHeader {
    PositionColumnLabel: string;
    EntityColumnLabel: string;
    ValueColumnLabels: ValueColumnLabel[];
}

interface ValueColumnLabel {
    Label: string;
    Explanation: string;
    ColumnTypeID: number;
    WidthMultiplier: number;
    Selected: boolean;
    Selectable: boolean;
}

interface ValueColumn {
    Value: string;
    Selected: boolean;
}

interface Row {
    Position: string;
    ItemID: number;
    Name: string;
    Details: string;
    ValueColumns: ValueColumn[];
    ColumnsOverlayString: string | null;
    ColumnCount: number;
    LogoUrl: string;
    RoundLogo: boolean;
    SeparatorType: number;
    DeepLinkTypeID: number;
    DeepLinkItemID: number;
    SectionTitle: string | null;
}

export interface RootTable {
    ItemID: number;
    TableType: number;
    TableHeader: TableHeader;
    Rows: Row[];
    TableExplanationText: string;
    EmptyStateText: string | null;
    AllRowsFetched: boolean;
    LeagueStatistics: any;
    SelectableTableTypes: any;
}
