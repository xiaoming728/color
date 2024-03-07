import { useMemo, useState } from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import { hsvaToRgba, hsvaToHex, ColorResult } from '@uiw/color-convert';
import Circle, { CircleProps } from '@uiw/react-color-circle';
import Wheel from '@uiw/react-color-wheel';
import ShadeSlider from '@uiw/react-color-shade-slider';
import Sketch from '@uiw/react-color-sketch';
import styles from './App.module.css';
import Code from './Code';
import colorsData from './colors.json';

function CircleColors(props: CircleProps & { title?: string; index: number }) {
  const { index, ...other } = props;
  const color = (props.colors || []).join('');
  return useMemo(() => {
    return (
      <div className={styles.color}>
        <Circle {...other} />
        <label>{props.title}</label>
      </div>
    );
  }, [color, index]);
}

export default function App() {
  const [hsva, setHsva] = useState({ h: 209, s: 36, v: 90, a: 1 });
  const handleColorChange = (data: ColorResult) => {
    setHsva(data.hsva);
  };
  const handleSwatchesPicker = (data: ColorResult) => {
    setHsva(data.hsva);
  };
  const color = hsvaToRgba(hsva);
  const hex = hsvaToHex(hsva);
  return (
    <div
      style={{
        backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        transition: 'background-color 0.3s ease 0s',
      }}
    >
      {/*<a href="https://apps.apple.com/app/palettegenius/id6472593276" target="_blank">*/}
      {/*  <img className={styles.appstore} src="https://jaywcjlove.github.io/sb/download/white-appstore.svg" />*/}
      {/*</a>*/}
      {/*<GitHubCorners fixed zIndex={999} size={60} target="__blank" href="https://github.com/uiwjs/ui-color" />*/}
      {/*<a href="https://apps.apple.com/app/palettegenius/id6472593276" target="_blank">*/}
      {/*  <img className={styles.appstore} src="https://jaywcjlove.github.io/sb/download/white-appstore.svg" />*/}
      {/*</a>*/}
      {/*<GitHubCorners fixed zIndex={999} size={60} target="__blank" href="https://github.com/xiaoming728/ui-color" />*/}
      <a href="https://xiaoming728.com" target="_blank">
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 999,
            width: '100px',
            height: '100px',
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
            overflow: 'hidden',
            backgroundColor: 'black', // 将北京的颜色改为黑色
          }}
        >
          <img
            src="https://xiaoming728.com/upload/logo.jpg"
            style={{
              width: '30%',
              height: '30%',
              borderRadius: '50%', // 创建一个圆形图像
              position: 'absolute',
              top: '30%',
              left: '70%',
              transform: 'translate(-50%, -50%)', // 将图像移动到三角形的中间
            }}
          />
        </div>
      </a>
      <div className={styles.warpper}>
        <div className={styles.colors}>
          <div>
            {colorsData.map((item, idx) => (
              <CircleColors
                index={item.colors.indexOf(hex.toLocaleUpperCase())}
                color={hex}
                key={idx}
                {...item}
                onChange={handleSwatchesPicker}
              />
            ))}
          </div>
        </div>
        <div className={styles.pane}>
          <div>
            <Wheel
              color={hsva}
              onChange={handleColorChange}
              style={{
                marginBottom: 20,
                boxShadow: 'rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px',
                borderRadius: '50%',
              }}
            />
            <ShadeSlider
              hsva={hsva}
              radius={8}
              style={{ marginBottom: 21, background: 'transparent', backgroundColor: 'transparent' }}
              onChange={(newShade) => setHsva({ ...hsva, v: newShade.v })}
            />
            <Sketch color={hsva} onChange={handleColorChange} />
            <div className={styles.footer}>
              <div>Copyright © uiwjs 2021.</div>
              <div>
                Developed by{' '}
                <a href="https://github.com/jaywcjlove" target="__blank">
                  Kenny
                </a>
                .
              </div>
            </div>
          </div>
          <div className={styles.code}>
            <Code
              color={color}
              lang="swift"
              title="SwiftUI"
              code={`Color(red: ${color.r / 100}, green: ${color.g / 100}, blue: ${color.b / 100}).opacity(${color.a})`}
            />
            <Code
              color={color}
              lang="swift"
              title="Swift for iOS"
              code={`UIColor(red: ${color.r}/255, green: ${color.g}/255, blue: ${color.b}/255, alpha: ${color.a})`}
            />
            <Code
              color={color}
              lang="swift"
              title="Swift for macOS"
              code={`NSColor(red: ${color.r / 100}, green: ${color.g / 100}, blue: ${color.b / 100}, alpha: ${
                color.a
              })`}
            />
            <Code
              color={color}
              lang="objectivec"
              title="Objective-C for iOS"
              code={`[UIColor colorWithRed: ${color.r / 100} green: ${color.g / 100} blue: ${color.b / 100} alpha: ${
                color.a
              }];`}
            />
            <Code
              color={color}
              lang="objectivec"
              title="Objective-C for macOS"
              code={`[NSColor colorWithCalibratedRed: ${color.r / 100} green: ${color.g / 100} blue: ${
                color.b / 100
              } alpha: ${color.a}];`}
            />
            <Code
              color={color}
              lang="csharp"
              title="Xamarin (C#)"
              code={`new UIColor(red: ${color.r / 100}f, green: ${color.g / 100}f, blue: ${color.b / 100}f, alpha: ${
                color.a
              }f)`}
            />
            <Code color={color} lang="css" title="CSS" code={`body { color: ${hex}; }`} />
          </div>
        </div>
      </div>
    </div>
  );
}
