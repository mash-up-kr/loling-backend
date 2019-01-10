# UML 생성방법

## 요구사항

- Java
- Graphviz

> macOS 사용자는 Grpahviz을 아래와 같이 설치할 수 있습니다.
> ```
> brew install libtool
> brew link libtool
> brew install graphviz
> brew link --overwrite graphviz
> ```
> 그 외의 사용자는 [http://plantuml.com/graphviz-dot](http://plantuml.com/graphviz-dot)에서 도움을 받을 수 있습니다.

## 실행 

```bash
java -jar plantuml.jar "UML이 적힌 txt 파일"
java -jar plantuml.jar erm-uml-190110.txt
```
