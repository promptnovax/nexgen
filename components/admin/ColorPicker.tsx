'use client'
import React from 'react'
import { useField, TextInput, FieldLabel } from '@payloadcms/ui'
import './ColorPicker.css'

const ColorPicker: React.FC<{ path: string; label: string }> = ({ path, label }) => {
    const { value, setValue } = useField<string>({ path })

    return (
        <div className="color-picker-container">
            <FieldLabel htmlFor={path} label={label} />
            <div className="color-picker-input-wrapper">
                <input
                    type="color"
                    value={value || '#000000'}
                    onChange={(e) => setValue(e.target.value)}
                    className="color-picker-input"
                />
                <TextInput
                    path={path}
                    name={path}
                    value={value || '#000000'}
                    onChange={(e) => setValue(e)}
                    className="color-hex-input"
                />
            </div>
        </div>
    )
}

export default ColorPicker
