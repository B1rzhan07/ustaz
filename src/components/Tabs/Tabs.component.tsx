import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs, Tab, Box } from '@mui/material'

function TabsComponent() {
  const { i18n } = useTranslation()
  const [value, setValue] = useState(i18n.language || 'kz')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    i18n.changeLanguage(newValue)
    setValue(newValue)
  }

  return (
    <Box
      sx={{ borderBottom: 5 }}
      style={{ backgroundColor: 'white', marginLeft: 10 }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          label="Қазақ тілі"
          value="kz"
          sx={{ minWidth: '120px' }}
          style={{
            color: 'black',
          }}
        />
        <Tab
          style={{
            color: 'black',
          }}
          label="Русский язык"
          value="ru"
          sx={{ minWidth: '120px' }}
        />
      </Tabs>
    </Box>
  )
}

export default TabsComponent
