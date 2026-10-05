import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Meta, DifficultyLabel } from '@/app/components/Meta'

describe('DifficultyLabel', () => {
    it('renders a simple difficulty', () => {
        render(<DifficultyLabel value="Beginner" />)
        expect(screen.getByText('Beginner')).toBeInTheDocument()
    })

    it('renders ranged difficulty with arrow icon', () => {
        const { container } = render(<DifficultyLabel value="Beginner → Advanced" />)
        expect(container.textContent).toContain('Beginner')
        expect(container.textContent).toContain('Advanced')
        // Verify arrow icon is present
        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('returns null when value is null', () => {
        const { container } = render(<DifficultyLabel value={null} />)
        expect(container.firstChild).toBeNull()
    })
})

describe('Meta', () => {
    it('renders a single item', () => {
        render(<Meta items={['Course']} />)
        expect(screen.getByText('Course')).toBeInTheDocument()
    })

    it('renders multiple items separated by dots', () => {
        render(<Meta items={['Course', 'Beginner']} />)
        expect(screen.getByText('Course')).toBeInTheDocument()
        expect(screen.getByText('Beginner')).toBeInTheDocument()
    })

    it('filters out null and undefined values', () => {
        render(<Meta items={['Course', null, undefined, 'Beginner']} />)
        expect(screen.getByText('Course')).toBeInTheDocument()
        expect(screen.getByText('Beginner')).toBeInTheDocument()
    })

    it('renders difficulty with arrow when using Meta', () => {
        const { container } = render(<Meta items={['Course', 'Beginner → Advanced']} />)
        expect(container.textContent).toContain('Course')
        expect(container.textContent).toContain('Beginner')
        expect(container.textContent).toContain('Advanced')
    })
})