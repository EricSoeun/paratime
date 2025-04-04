declare module 'react-simple-maps' {
  import React from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
    };
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: any[] }) => React.ReactNode;
  }

  export interface GeographyProps {
    geography: any;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    className?: string;
    key?: string | number;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    style?: React.CSSProperties;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    children?: React.ReactNode;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    translateExtent?: [[number, number], [number, number]];
    onMoveStart?: (position: { coordinates: [number, number], zoom: number }) => void;
    onMove?: (position: { coordinates: [number, number], zoom: number }) => void;
    onMoveEnd?: (position: { coordinates: [number, number], zoom: number }) => void;
    children?: React.ReactNode;
  }

  export const ComposableMap: React.FunctionComponent<ComposableMapProps>;
  export const Geographies: React.FunctionComponent<GeographiesProps>;
  export const Geography: React.FunctionComponent<GeographyProps>;
  export const Marker: React.FunctionComponent<MarkerProps>;
  export const ZoomableGroup: React.FunctionComponent<ZoomableGroupProps>;
} 