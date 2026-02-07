'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  DataGrid,
  GridColDef,
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
  ExportCsv,
  ExportPrint,
  QuickFilter,
  QuickFilterControl,
  QuickFilterClear,
  QuickFilterTrigger,
} from '@mui/x-data-grid';
import { 
  Tooltip, Menu, Badge, MenuItem, Divider, 
  TextField, InputAdornment, Typography, Box 
} from '@mui/material';
import { 
  Columns, Filter, Download, Search, 
  XCircle, Printer, FileText 
} from 'lucide-react';

type OwnerState = { expanded: boolean };

const StyledQuickFilter = styled(QuickFilter)({
  display: 'grid',
  alignItems: 'center',
  '--trigger-width': '34px', 
});

const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(
  ({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    width: 'min-content',
    height: 'min-content',
    zIndex: 1,
    opacity: ownerState.expanded ? 0 : 1,
    pointerEvents: ownerState.expanded ? 'none' : 'auto',
    transition: theme.transitions.create(['opacity']),
  }),
);

const StyledTextField = styled(TextField)<{ ownerState: OwnerState }>(
  ({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    overflowX: 'clip',
    width: ownerState.expanded ? 260 : 'var(--trigger-width)',
    opacity: ownerState.expanded ? 1 : 0,
    transition: theme.transitions.create(['width', 'opacity']),
    '& .MuiInputBase-root': {
       fontSize: '0.875rem',
    }
  }),
);

function CustomToolbar({ title }: { title?: string }) {
  const [exportMenuOpen, setExportMenuOpen] = React.useState(false);
  const exportMenuTriggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <Toolbar 
  className="
    flex items-center justify-between 
    border-b border-stroke px-10 
    min-h-20
    py-4
    dark:border-strokedark
  "
      
    >
      <Typography 
        variant="h6"
        fontWeight="700" 
        className="text-lg uppercase tracking-wide text-black dark:text-white"
      >
        {title || 'Monitoring'}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      <div className="flex items-center gap-2">
        <Tooltip title="Columns">
          <ColumnsPanelTrigger render={<ToolbarButton className="text-body dark:text-white" />}>
            <Columns size={18} />
          </ColumnsPanelTrigger>
        </Tooltip>

        <Tooltip title="Filters">
          <FilterPanelTrigger
            render={(props, state) => (
              <ToolbarButton {...props} className="text-body dark:text-white">
                <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                  <Filter size={18} />
                </Badge>
              </ToolbarButton>
            )}
          />
        </Tooltip>

        <Divider orientation="vertical" flexItem className="mx-2 dark:bg-strokedark" />  {/* mx-2 biar divider lebih lebar */}

        <Tooltip title="Export">
          <ToolbarButton
            ref={exportMenuTriggerRef}
            onClick={() => setExportMenuOpen(true)}
            className="text-body dark:text-white"
          >
            <Download size={18} />
          </ToolbarButton>
        </Tooltip>

        <Menu
          anchorEl={exportMenuTriggerRef.current}
          open={exportMenuOpen}
          onClose={() => setExportMenuOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <ExportPrint render={<MenuItem className="gap-2" />} onClick={() => setExportMenuOpen(false)}>
            <Printer size={16} /> Print
          </ExportPrint>
          <ExportCsv render={<MenuItem className="gap-2" />} onClick={() => setExportMenuOpen(false)}>
            <FileText size={16} /> Download CSV
          </ExportCsv>
        </Menu>

        <StyledQuickFilter>
          <QuickFilterTrigger
            render={(triggerProps, state) => (
              <Tooltip title="Search">
                <StyledToolbarButton 
                  {...triggerProps} 
                  ownerState={{ expanded: state.expanded }} 
                  className="text-body dark:text-white"
                >
                  <Search size={18} />
                </StyledToolbarButton>
              </Tooltip>
            )}
          />
          <QuickFilterControl
            render={({ ref, ...controlProps }, state) => (
              <StyledTextField
                {...controlProps}
                ownerState={{ expanded: state.expanded }}
                inputRef={ref}
                placeholder="Search..."
                size="small"
                slotProps={{
                  input: {
                    className: "dark:text-white",
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={16} className="text-primary" />
                      </InputAdornment>
                    ),
                    endAdornment: state.value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear size="small">
                          <XCircle size={16} />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                  },
                }}
              />
            )}
          />
        </StyledQuickFilter>
      </div>
    </Toolbar>
  );
}

interface AtomicTableProps {
  rows: any[];
  columns: GridColDef[];
  loading?: boolean;
   title?: string;
   checkboxSelection?: boolean;
}

export default function AtomicDataTable({ rows, columns, loading, title, checkboxSelection }: AtomicTableProps) {
  return (
    <Box className="w-full bg-white dark:bg-boxdark rounded-sm border border-stroke dark:border-strokedark shadow-default" >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: { title }
           }}
           disableColumnMenu={false}
           autoHeight
           getRowHeight={() => 'auto'}
           showToolbar
           checkboxSelection={checkboxSelection ?? false}
        disableRowSelectionOnClick
        sx={{
           border: 'none',
           '& .MuiDataGrid-toolbar': {
    minHeight: '80px !important',
    height: 'auto !important',
    paddingY: '16px !important',
  },

  '& .MuiDataGrid-toolbarContainer': {
    minHeight: '80px !important',
  },
    '& .MuiDataGrid-virtualScroller': {
      pt: 0,
    },
           '& .MuiDataGrid-cell': {
            alignItems: 'center',
            paddingTop: '12px !important',
            paddingBottom: '12px !important',
            borderBottom: (t) => `1px solid ${t.palette.mode === 'dark' ? '#313D4A' : '#f1f5f9'}`,
          },

          '& .MuiDataGrid-row': {
            maxHeight: 'none !important',
            minHeight: 'auto !important',
          },

          '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#bfdbfe !important',
    color: '#000000 !important',
           },
          '& .MuiDataGrid-container--top [role="row"]': {
    backgroundColor: '#bfdbfe !important',
    color: '#000000 !important',
           },
          '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#bfdbfe !important',
    color: '#000000 !important',
    fontWeight: 600,
           },
          '& .MuiDataGrid-columnHeaderTitle': {
    textTransform: 'uppercase !important',
    fontWeight: '700 !important',
  },

  '& .MuiDataGrid-columnHeader:hover': {
    backgroundColor: '#93c5fd !important',
  },
        }}
      />
    </Box>
  );
}