Page({
    data: {
        value1: '1',
        value2: '1',
        value3: '1',
        value4: '1',
    },
    onChange(field, e) {
        this.setData({
            [field]: e.detail.value
        })

        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    onChange1(e) {
        this.onChange('value1', e)
    },
    onChange2(e) {
        this.onChange('value2', e)
    },
    onChange3(e) {
        this.onChange('value3', e)
    },
    onChange4(e) {
        this.onChange('value4', e)
    },
    formSubmit(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
})