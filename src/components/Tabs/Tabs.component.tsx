import * as React from 'react'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { MenuItem } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function TabsComponent() {
  const { i18n } = useTranslation()
  const handleChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode,
  ) => {
    i18n.changeLanguage(event.target.value)
  }
  const [value, setValue] = React.useState(0)

  const handleChanges = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <FormControl>
          <InputLabel id="language-select-label">Тіл</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={i18n.language || 'kz'}
            label="Language"
            onChange={handleChange}
          >
            <MenuItem value="kz">Қазақ тілі</MenuItem>
            <MenuItem value="ru">Русский язьк</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChanges}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </>
  )
}
