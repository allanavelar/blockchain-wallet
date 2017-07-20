import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { formValueSelector } from 'redux-form'

import { wizardForm } from 'components/providers/FormProvider'
import { actions, selectors } from 'data'
import FirstStep from './FirstStep'

class SendBitcoinContainer extends React.Component {
  componentWillMount () {
    this.props.reduxFormActions.change('sendBitcoin', 'from', this.props.defaultSource)
  }

  render () {
    const { step, ...rest } = this.props

    switch (step) {
      default:
        return <FirstStep {...rest} />
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const defaultSource = {
    xpub: selectors.core.wallet.getDefaultAccountXpub(state),
    index: selectors.core.wallet.getDefaultAccountIndex(state)
  }
  const selector = formValueSelector('sendBitcoin')

  return {
    defaultSource
  }
}

const mapDispatchToProps = (dispatch) => ({
  modalActions: bindActionCreators(actions.modals, dispatch),
  transactionActions: bindActionCreators(actions.core.transactions, dispatch)
})

const enhance = compose(
  wizardForm('sendBitcoin', 2),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(SendBitcoinContainer)
