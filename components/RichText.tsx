import React, { Fragment } from 'react';

// Serializer for Lexical rich text content
export const serialize = (children: any[]): React.ReactNode[] =>
    children.map((node, i) => {
        if (node.type === 'text') {
            let text = <span key={i}>{node.text}</span>;

            if (node.format & 1) {
                text = <strong key={i}>{text}</strong>;
            }
            if (node.format & 2) {
                text = <em key={i}>{text}</em>;
            }
            if (node.format & 8) {
                text = <code key={i}>{text}</code>;
            }

            return text;
        }

        if (!node) {
            return null;
        }

        switch (node.type) {
            case 'h1':
                return <h1 key={i}>{serialize(node.children)}</h1>;
            case 'h2':
                return <h2 key={i}>{serialize(node.children)}</h2>;
            case 'h3':
                return <h3 key={i}>{serialize(node.children)}</h3>;
            case 'h4':
                return <h4 key={i}>{serialize(node.children)}</h4>;
            case 'h5':
                return <h5 key={i}>{serialize(node.children)}</h5>;
            case 'h6':
                return <h6 key={i}>{serialize(node.children)}</h6>;
            case 'quote':
                return <blockquote key={i}>{serialize(node.children)}</blockquote>;
            case 'ul':
                return <ul key={i}>{serialize(node.children)}</ul>;
            case 'ol':
                return <ol key={i}>{serialize(node.children)}</ol>;
            case 'li':
                return <li key={i}>{serialize(node.children)}</li>;
            case 'link':
                return (
                    <a href={node.fields.url} key={i} target={node.fields.newTab ? '_blank' : '_self'}>
                        {serialize(node.children)}
                    </a>
                );
            case 'paragraph':
                return <p key={i}>{serialize(node.children)}</p>;
            case 'linebreak':
                return <br key={i} />;
            case 'horizontalrule':
                return <hr key={i} />;
            case 'upload':
                return (
                    <div key={i} className="rich-text-upload">
                        {/* Simple placeholder for uploads/images */}
                        {node.value?.url && (
                            <img src={node.value.url} alt={node.value.alt || ''} />
                        )}
                    </div>
                );
            default:
                return (
                    <Fragment key={i}>
                        {node.children ? serialize(node.children) : null}
                    </Fragment>
                );
        }
    });

export default function RichText({ content }: { content: any }) {
    if (!content || !content.root || !content.root.children) {
        return null;
    }

    return <div className="rich-text">{serialize(content.root.children)}</div>;
}
