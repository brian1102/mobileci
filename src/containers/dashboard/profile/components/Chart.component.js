import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'
import { LayoutAnimation, Platform, Text, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import tr from '../../../../i18n/i18n'
import * as c from '../../../../state/constants'
import NativeFeedback from '../../../../components/native-feedback/index'
import { colors, font } from '../../../../theme'
import * as u from '../../../../utils/object'

const barHeight = 112

const unit = 30
const barSize = 16

const styles = StyleSheet.create({
  label: {
    alignSelf: 'stretch',
    backgroundColor: colors.transparent,
    textAlign: 'left',
    margin: 16,
    fontWeight: 'bold',
    fontSize: font.tinier,
    color: '#0d0c11'
  },
  big: {
    alignSelf: 'stretch',
    backgroundColor: colors.transparent,
    textAlign: 'left',
    fontWeight: '200',
    fontSize: font.huge,
    color: '#0d0c11'
  },
  tiny: {
    alignSelf: 'stretch',
    backgroundColor: colors.transparent,
    textAlign: 'left',
    fontWeight: '600',
    fontSize: font.tab,
    color: '#0d0c11'
  },
  day: {
    alignSelf: 'stretch',
    backgroundColor: colors.transparent,
    fontWeight: '600',
    fontSize: font.day,
    color: '#9d9d9d',
    width: unit,
    textAlign: 'center'
  },
  rangeButton: {
    alignSelf: 'stretch',
    backgroundColor: colors.transparent,
    fontWeight: '600',
    fontSize: font.day,
    color: '#9d9d9d',
    textAlign: 'center',
    paddingTop: 20,
    height: 66
  },
  selectedRange: {
    color: 'black',
    fontWeight: '800'
  },
  incomePerItem: {
    alignSelf: 'stretch',
    backgroundColor: colors.transparent,
    fontWeight: '200',
    fontSize: 10,
    color: '#9e9e9e',
    width: unit,
    textAlign: 'center'
  },
  currency: {
    alignSelf: 'stretch',
    backgroundColor: colors.transparent,
    textAlign: 'left',
    fontWeight: '300',
    fontSize: font.big,
    color: '#0d0c11'
  },
  holder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      height: 4
    },
    elevation: 4
  },
  statsHolder: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 4
  },
  range: {
    alignSelf: 'stretch',
    backgroundColor: colors.transparent,
    textAlign: 'left',
    fontWeight: '600',
    fontSize: font.tiny,
    color: colors.brand,
    paddingBottom: 16
  },
  bar: {
    borderRadius: 9999,
    width: 16,
    height: barHeight,
    shadowColor: colors.black,
    shadowOpacity: 0.35,
    shadowRadius: 4,
    shadowOffset: {
      height: 4
    },
    elevation: 4
  },
  zeroBar: {
    backgroundColor: '#394b5f',
    borderRadius: 9999,
    width: barSize,
    height: barSize,
    shadowColor: colors.black,
    shadowOpacity: 0.35,
    shadowRadius: 4,
    shadowOffset: {
      height: 4
    },
    elevation: 4
  },
  barWrapper: {
    width: unit,
    alignItems: 'center'
  },
  barHolder: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    height: barHeight,
    marginBottom: 16,
  },
  dayHolder: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  bottomChooseTab: {
    width: '100%',
    marginTop: 20,
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
    borderStyle: 'dotted'
  },
  rangeHolder: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },
  statBlock: {
    paddingTop: 12
  }
})

const calcValues = report => {
  const max = Math.max(...report.map(i => i.tasks.completed))
  return report.map(i => (max > 0 ? i.tasks.completed / max : 0))
}

const periodOfTimes = () => [
  { label: tr('history_range_today'), key: c.STAT_TODAY },
  { label: tr('history_range_1_week'), key: c.STAT_LAST_WEEK },
  { label: tr('history_range_1_month'), key: c.STAT_LAST_FOUR_WEEKS }
]

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: null,
      periodOfTime: periodOfTimes()[0]
    }

    this.lastPeriodOfTime = periodOfTimes()[0]
  }

  onLayout = event => {
    if (this.isLayout) return
    this.isLayout = true
    const { nativeEvent: { layout } } = event
    this.setState({
      width: layout.width
    })
  }

  componentWillUpdate() {
    if (Platform.OS !== 'android')
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !nextProps.chartData.today &&
      !nextProps.chartData.last_week &&
      !nextProps.chartData.last_four_weeks &&
      this.props.chartData.today !== null &&
      this.props.chartData.last_week !== null &&
      this.props.chartData.last_four_weeks !== null &&
      nextState === this.state
    ) {
      return false
    }

    return true
  }

  render() {
    const { width, periodOfTime } = this.state
    const indexOfSelection = periodOfTimes().findIndex(ele => ele.key === periodOfTime.key);
    if (!this.props.chartData[periodOfTime.key]) return null

    const report = this.props.chartData[periodOfTime.key]
    if (!report) return null
    const values = calcValues(report)

    const barFootDay = []
    const barFootIncomPerDay = []
    let totalCompleted = 0

    for (let i = 0; i < report.length; i++) {
      const item = report[i]
      // TODO: hide income right now
      // sumIncome += item.income
      totalCompleted += item.tasks.completed

      let barFootDayItem = u.cloneObject(item.date)

      if (report.length !== 4) {
        barFootDayItem = moment(barFootDayItem).format('dd')
      } else {
        barFootDayItem = `${tr('week_a')}${i + 1}`
      }

      barFootDay.push(
        <Text key={`barFootDay${i}`} style={styles.day}>
          {barFootDayItem}
        </Text>
      )

      barFootIncomPerDay.push(
        <Text key={`barFootIncomPerDay${i}`} style={styles.incomePerItem}>
          {`${item.tasks.completed}`}
        </Text>
      )
    }

    return (
      <View>
        <Text style={styles.label}>
          {tr('stats').toUpperCase()}
        </Text>
        <View style={[styles.holder, styles.statsHolder]}>
          <View style={styles.statBlock}>
            <Text style={styles.big}>{totalCompleted}</Text>
            <Text style={styles.tiny}>
              {tr('completed_jobs')}
            </Text>
          </View>
          {/* TODO: hide income right now
            <View style={styles.statBlock}>
            <Text style={styles.big}>
              <Text style={styles.currency}>$</Text>
              {formatUSD(sumIncome)}
            </Text>
            <Text style={styles.tiny}>
              {tr('income')}
            </Text>
          </View>
        */}
          <Text style={styles.range}>
            {periodOfTime.label}
          </Text>

          <View style={styles.barHolder}>
            {values.map((i, index) => {
              const isZero = i < 0.1
              return (
                <View style={styles.barWrapper} key={index}>
                  <LinearGradient
                    colors={[
                      isZero ? '#394b5f' : '#42b7ed',
                      isZero ? '#394b5f' : '#84c069'
                    ]}
                    style={[
                      styles.bar,
                      { height: Math.max(barHeight * i, barSize) }
                    ]}
                  />
                </View>
              )
            })}
          </View>

          <View style={styles.dayHolder}>
            {barFootDay}
          </View>

          <View style={styles.dayHolder}>
            {barFootIncomPerDay}
          </View>

          <View style={styles.bottomChooseTab}>
            {
              indexOfSelection >= 0 &&
              <View
                style={{
                  width: width / 3,
                  height: 1,
                  backgroundColor: 'black',
                  marginLeft: indexOfSelection / 3 * width
                }}
              />
            }
          </View>
          <View style={styles.rangeHolder} onLayout={this.onLayout}>
            {periodOfTimes().map(i => {
              return (
                <NativeFeedback
                  key={i.key}
                  onPress={() => {
                    this.lastPeriodOfTime = i
                    this.setState({ periodOfTime: i })
                  }}
                >
                  <Text
                    style={[
                      styles.rangeButton,
                      periodOfTime.key === i.key && styles.selectedRange,
                      { width: width / 3 }
                    ]}
                  >
                    {i.label.toUpperCase()}
                  </Text>
                </NativeFeedback>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

Chart.propTypes = {
  chartData: PropTypes.object.isRequired
}

export default Chart
