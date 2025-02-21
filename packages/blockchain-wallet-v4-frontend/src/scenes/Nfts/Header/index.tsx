import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import styled from 'styled-components'

import { Button, Icon, TabMenu, TabMenuItem } from 'blockchain-info-components'
import { Form, TextBox } from 'components/Form'

import { Props as OwnProps } from '..'

const Wrapper = styled.div`
  width: 100%;
  z-index: 3;
  padding-bottom: 8px;
  background: ${(props) => props.theme.white};
  position: sticky;
  top: 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  gap: 24px;
`

const TabsContainer = styled.div`
  display: inline-block;
`

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  gap: 8px;
  > div {
    max-width: 400px;
  }
`

const NftHeader: React.FC<InjectedFormProps<{}, Props> & Props> = ({
  activeTab,
  nftsActions,
  setActiveTab,
  ...rest
}) => {
  const handleSubmit = (e) => {
    if (!e) return
    e.preventDefault()
    setActiveTab('explore')
    nftsActions.searchNftAssetContract({ asset_contract_address: e.target[0].value })
  }

  const handleRefresh = () => {
    if (activeTab === 'explore') {
      nftsActions.clearAndRefetchOrders()
    } else if (activeTab === 'my-collection') {
      nftsActions.clearAndRefetchAssets()
    } else {
      nftsActions.clearAndRefetchOffersMade()
    }
  }

  return (
    <Wrapper>
      <TabsContainer>
        <TabMenu>
          <TabMenuItem onClick={() => setActiveTab('explore')} selected={activeTab === 'explore'}>
            Explore
          </TabMenuItem>
          <TabMenuItem
            onClick={() => setActiveTab('my-collection')}
            selected={activeTab === 'my-collection'}
          >
            My Collection
          </TabMenuItem>
          <TabMenuItem onClick={() => setActiveTab('offers')} selected={activeTab === 'offers'}>
            Offers
          </TabMenuItem>
        </TabMenu>
      </TabsContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Field
          placeholder='Search Collection By Contract Address'
          name='search'
          component={TextBox}
        />
        <Button disabled={rest.submitting} data-e2e='searchNfts' type='submit' nature='primary'>
          <FormattedMessage id='buttons.search' defaultMessage='Search' />
        </Button>
        <Icon
          role='button'
          size='24px'
          cursor
          name='refresh'
          color='blue600'
          onClick={handleRefresh}
        />
      </StyledForm>
    </Wrapper>
  )
}

type Props = OwnProps & {
  activeTab: 'explore' | 'my-collection' | 'offers'
  setActiveTab: React.Dispatch<React.SetStateAction<'explore' | 'my-collection' | 'offers'>>
}

export default reduxForm<{}, Props>({ form: 'nftSearch' })(NftHeader)
