export interface ITemplate {
	_id: string
	name: string
	key: string
	jsonSchema: object
	description?: string
	category?: string
	createdAt?: string
	updatedAt?: string
}

export interface IPastEdit {
	id: number
	name: string
	date: string
	author: string
	status: 'published' | 'draft'
}

export interface IDocumentEditorProps {
	template: ITemplate
	pastEdits: IPastEdit[]
}
